import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Post = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  image?: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
};

type PostListItemProps = {
  post: Post;
  isDetailedPost?: boolean;
};

export default function PostListItem({ post, isDetailedPost }: PostListItemProps) {
  const router = useRouter();

  if (isDetailedPost) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: post.user.image || 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg' }}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.timestamp}>
              {formatDistanceToNowStrict(new Date(post.created_at))}
            </Text>
          </View>
        </View>

        <Text style={styles.content}>{post.content}</Text>
        {post.image && (
          <Image source={{ uri: post.image }} style={styles.postImage} />
        )}

        <View style={styles.footer}>
          <MaterialCommunityIcons name="arrow-up-bold-outline" size={24} color="gray" />
          <MaterialCommunityIcons name="arrow-down-bold-outline" size={24} color="gray" />
          <MaterialCommunityIcons name="comment-outline" size={24} color="gray" />
          <MaterialCommunityIcons name="share-outline" size={24} color="gray" />
        </View>
      </View>
    );
  }

  return (
    <Pressable 
      style={styles.container}
      onPress={() => {
        if (!isDetailedPost) {
          router.push({
            pathname: "/(protected)/post/[id]",
            params: { id: post.id }
          });
        }
      }}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: post.user.image || 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg' }}
          style={styles.userImage}
        />
        <View>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.timestamp}>
            {formatDistanceToNowStrict(new Date(post.created_at))}
          </Text>
        </View>
      </View>

      <Text style={styles.content} numberOfLines={3}>
        {post.content}
      </Text>
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      <View style={styles.footer}>
        <MaterialCommunityIcons name="arrow-up-bold-outline" size={24} color="gray" />
        <MaterialCommunityIcons name="arrow-down-bold-outline" size={24} color="gray" />
        <MaterialCommunityIcons name="comment-outline" size={24} color="gray" />
        <MaterialCommunityIcons name="share-outline" size={24} color="gray" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: '600',
    marginBottom: 3,
  },
  timestamp: {
    color: 'gray',
  },
  content: {
    lineHeight: 20,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 10,
  },
  iconBox: {
    borderWidth: 0.5,
    borderColor: '#D4D4D4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
});