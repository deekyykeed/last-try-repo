import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import PostListItem from '../../components/PostListItem';
import { ThemedText } from "../../components/ThemedText";
import { supabase } from "../../lib/supabase";
import { Database } from '../../types/supabase';

type Post = Database['public']['Tables']['posts']['Row'];

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Small delay to ensure Supabase client is initialized
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          created_at,
          title,
          description,
          image,
          users!posts_user_id_fkey (
            id,
            name,
            image
          ),
          groups (
            id,
            name,
            image
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Posts fetched:', data);
      setPosts(data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <ThemedText style={{ textAlign: 'center', marginBottom: 10 }}>Error loading posts</ThemedText>
        <ThemedText style={{ textAlign: 'center', color: 'red' }}>{error}</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      onRefresh={fetchPosts}
      refreshing={loading}
    />
  );
}
