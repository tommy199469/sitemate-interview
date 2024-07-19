import {
  TextInput,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { createArticleStore } from "@/store/articleStore";
import { useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import { styles } from "./styles";

export default function HomeScreen() {
  const {
    articles,
    setArticles,
    getArticles,
    keyword,
    setKeyword,
    startDate,
    setStartDate,
    sortBy,
    sortByOptions,
    setSortBy,
    loading,
    keywordHistory,
    updateKeywordHistory,
  } = createArticleStore();

  useEffect(() => {
    const timeoutForTyping = setTimeout(() => {
      if (keyword) {
        updateKeywordHistory(keyword);
      }
      if (sortBy && keyword && startDate) getArticles();
    }, 1000);

    if (keyword.length === 0) {
      setArticles([]);
    }
    return () => clearTimeout(timeoutForTyping);
  }, [sortBy, keyword, startDate]);

  const onChange = (event: any, selectedDate: any) => {
    setStartDate(selectedDate || startDate);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.articleContainer}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleSubTitle}>
        [{item.author}] From {item.source.name}
      </Text>
      <Text style={styles.articleContent}>{item.content}</Text>
    </View>
  );

  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View style={styles.stickyHeader}>
        {/* keyword */}
        <View style={styles.keywordContainer}>
          {/* input */}
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Please enter keyword for searching"
            style={styles.searchInput}
          />
          {/* history */}
          {keywordHistory.length > 0 && (
            <SelectList
              setSelected={setKeyword}
              data={keywordHistory.map((k) => ({ value: k, title: k }))}
              placeholder="Select from history"
            />
          )}
        </View>

        {/* date picker and sorting by */}
        <View style={styles.viewStyle}>
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode="date"
            onChange={onChange}
            display="default"
            style={{
              marginRight: 20,
            }}
            maximumDate={today}
            minimumDate={oneMonthAgo}
          />
          <SelectList
            setSelected={(val: any) => setSortBy(val)}
            data={sortByOptions}
            boxStyles={styles.selectBox}
          />
        </View>
      </View>

      {/* result list */}
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + index}
        ListEmptyComponent={
          <View style={styles.viewStyle}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text>No articles found.</Text>
            )}
          </View>
        }
      />
    </ScrollView>
  );
}
