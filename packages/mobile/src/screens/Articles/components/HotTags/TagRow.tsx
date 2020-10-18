import React from 'react';
import {Colors, L3} from 'shared-ui';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ArticleTag} from 'shared-logic';

type Props = {
  tags: ArticleTag[];
  style?: StyleProp<ViewStyle>;
};

const TagRow: React.FC<Props> = ({tags, style}) => (
  <View style={[styles.tagsRow, style]}>
    {tags?.map((tag, idx) => (
      <TouchableOpacity
        key={`tag-${tag.id}-${idx}`}
        style={styles.hotTag}
        onPress={() => {}} // TODO: Handle redirection to article by tags
      >
        <L3 style={styles.tagTitle}>{tag.name}</L3>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  hotTag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: Colors.blue100,
    borderRadius: 24,
  },
  tagsRow: {
    flexDirection: 'row',
  },
  tagTitle: {
    color: Colors.blue500,
  },
});

export default TagRow;
