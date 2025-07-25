import { Entypo, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { formatDistanceToNowStrict } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
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

import comments from '@/assets/data/comments.json';
import posts from '@/assets/data/posts.json';
import PostListItem from '@/components/PostListItem';

export default function PostDetailed() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [comment, setComment] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);  const detailedPost = posts.find((post) => post.id === id);
  const postComments = comments.filter(
    (comment) => comment.post_id === detailedPost?.id
  );

  if (!detailedPost) {
    return <Text>Post Not Found!</Text>;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={styles.container} 
      keyboardVerticalOffset={insets.top + 10}
    >
      <FlatList
        ListHeaderComponent={
          <PostListItem post={detailedPost} isDetailedPost />
        }
        data={postComments}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
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
          </View>
        )}
      />
      
      {/* Comment Input Section */}
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
        <TextInput
          placeholder="Join the conversation"
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          multiline
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {isInputFocused && (
          <Pressable 
            disabled={!comment} 
            onPress={() => console.error('Pressed')} 
            style={[
              styles.replyButton,
              { backgroundColor: !comment ? "lightgrey" : '#0d469b' }
            ]}
          >
            <Text style={styles.replyButtonText}>Reply</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentContainer: {
    backgroundColor: 'white',
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
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
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
