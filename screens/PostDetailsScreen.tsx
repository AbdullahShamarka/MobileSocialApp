import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../App';

type PostDetailsRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function PostDetailsScreen() {
  const route = useRoute<PostDetailsRouteProp>();
  const { post } = route.params;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await fetch(`https://gorest.co.in/public/v2/posts/${post.id}/comments`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <View style={styles.userRow}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${post.user_id}` }}
            style={styles.avatar}
          />
          <Text style={styles.username}>User {post.user_id}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>

      <Text style={styles.commentsHeader}>Comments</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentCard}>
              <View style={styles.userRow}>
                <Image
                  source={{ uri: `https://i.pravatar.cc/150?u=${item.email}` }}
                  style={styles.avatar}
                />
                <Text style={styles.username}>{item.name}</Text>
              </View>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  post: { marginBottom: 20, backgroundColor: '#f2f2f2', padding: 12, borderRadius: 10 },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  username: { fontWeight: 'bold' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  body: { fontSize: 15, color: '#444' },
  commentsHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  commentCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
});
