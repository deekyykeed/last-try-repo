import { formatDistanceToNow } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { supabase } from '../../lib/supabase';
import { Database } from '../../types/supabase';

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
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>{post.title}</ThemedText>
        <ThemedText style={styles.time}>
          {formatDistanceToNow(new Date(post.created_at))} ago
        </ThemedText>

        {post.image && (
          <Image source={{ uri: post.image }} style={styles.image} />
        )}

        <ThemedText style={styles.content}>{post.description}</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  time: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});
