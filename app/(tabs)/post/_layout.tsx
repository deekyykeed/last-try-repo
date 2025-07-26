import { Stack } from 'expo-router';

export default function PostLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]"
        options={{
          title: 'Post Details'
        }}
      />
    </Stack>
  );
}
