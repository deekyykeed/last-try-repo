import PostListItem from "@/components/PostListItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import posts from '../../assets/data/posts.json';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  // Memoize posts to prevent unnecessary re-renders
  const sortedPosts = useMemo(() => {
    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Add your refresh logic here
    // e.g., fetch new posts from API
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post, index) => (
            <PostListItem 
              key={post.id}
              post={post}
              isLast={index === sortedPosts.length - 1}
            />
          ))
        ) : (
          <ThemedView style={styles.emptyState}>
            <ThemedText style={styles.emptyStateText}>
              No posts available
            </ThemedText>
            <ThemedText style={styles.emptyStateSubtext}>
              Pull down to refresh
            </ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // Removed paddingBottom: 20
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
});