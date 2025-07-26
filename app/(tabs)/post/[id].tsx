import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import PostListItem from '../../../components/PostListItem';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';
import { supabase } from '../../../lib/supabase';
import { Database } from '../../../types/supabase';

type Post = Database['public']['Tables']['posts']['Row'];

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*, user:users(*), group:groups(*)')
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
      <ThemedView style={styles.centered}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (error || !post) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.errorText}>
          {error || 'Post not found'}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PostListItem post={post} isDetailedPost />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});
