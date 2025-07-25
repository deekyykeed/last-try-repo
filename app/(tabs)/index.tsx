import PostListItem from '@/components/PostListItem';
import { FlatList } from 'react-native';
import posts from '../../assets/data/posts.json';

export default function HomeScreen() {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
}