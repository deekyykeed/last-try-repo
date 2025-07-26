import { Entypo, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { formatDistanceToNowStrict } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PostListItem from '../../../components/PostListItem';
import { Squircle } from '../../../components/ui/Squircle';
import { supabase } from '../../../lib/supabase';
import { Database } from '../../../types/supabase';

export default function PostDetailed() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [comment, setComment] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  
  const [post, setPost] = useState<Database['public']['Tables']['posts']['Row'] | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('id, created_at, title, description, image, upvotes, nr_of_comments, user, group')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      setPost(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>{error || 'Post not found'}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={styles.container} 
      keyboardVerticalOffset={insets.top + 10}
    >
      <FlatList
        ListHeaderComponent={
          <PostListItem post={post} isDetailedPost />
        }
        data={comments}
        keyExtractor={(item: Comment) => item.id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        renderItem={({ item }: { item: Comment }) => (
          <Squircle 
            style={styles.commentContainer}
            radius={15}
            shadowOpacity={0.08}
            shadowRadius={4}
          >
            <View style={styles.commentHeader}>
              <Image 
                source={{ uri: item.user.image || "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg" }} 
                style={styles.avatar} 
              />
              <Text style={styles.userName}>{item.user.name}</Text>
              <Text style={styles.bullet}>&#x2022;</Text>
              <Text style={styles.timestamp}>
                {formatDistanceToNowStrict(new Date(item.created_at))}
              </Text>
            </View>
            <Text>{item.comment}</Text>
            <View style={styles.commentActions}>
              <Entypo name="dots-three-horizontal" size={15} color="#737373" />
              <Octicons name="reply" size={16} color="#737373" />
              <MaterialCommunityIcons name="trophy-outline" size={16} color="#737373" />
              <View style={styles.votingContainer}>
                <MaterialCommunityIcons name="arrow-up-bold-outline" size={18} color="#737373" />
                <Text style={styles.voteCount}>{item.upvotes}</Text>
                <MaterialCommunityIcons name="arrow-down-bold-outline" size={18} color="#737373" />
              </View>
            </View>
          </Squircle>
        )}
      />
      
      {/* Comment Input Section */}
      <Squircle 
        style={[styles.inputContainer, { paddingBottom: insets.bottom }]}
        radius={15}
        shadowOpacity={0.15}
        shadowRadius={5}
        elevation={4}
      >
        <TextInput
          placeholder="Join the conversation"
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          multiline
          maxLength={1000}
          returnKeyType="done"
          blurOnSubmit={true}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <Pressable 
          disabled={!comment.trim()}
          onPress={() => {
            // Here you would typically make an API call to post the comment
            // For now we'll just clear the input
            setComment('');
            setIsInputFocused(false);
          }}
          style={[
            styles.replyButton,
            { backgroundColor: !comment.trim() ? "lightgrey" : '#0d469b' }
          ]}
        >
          <Text style={styles.replyButtonText}>Reply</Text>
        </Pressable>
      </Squircle>
    </KeyboardAvoidingView>
  );
}

type Comment = {
  id: string;
  comment: string;
  created_at: string;
  upvotes: number;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 15,
    marginRight: 4,
  },
  userName: {
    fontWeight: '600',
    color: '#737373',
    fontSize: 13,
  },
  bullet: {
    color: '#737373',
    fontSize: 13,
  },
  timestamp: {
    color: '#737373',
    fontSize: 13,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 14,
  },
  votingContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  voteCount: {
    fontWeight: '500',
    color: '#737373',
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    backgroundColor: '#E4E4E4',
    padding: 5,
    borderRadius: 5,
  },
  replyButton: {
    borderRadius: 15,
    marginLeft: 'auto',
    marginTop: 15,
  },
  replyButtonText: {
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 13,
  },
});
