import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  stickyHeader: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    zIndex: 1, // Make sure the header is above other content
    paddingTop: 70,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    width: "50%",
  },
  viewStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  articleContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  articleContent: {
    fontSize: 14,
  },
  selectBox: {
    minWidth: "50%",
  },
  articleSubTitle: {
    fontSize: 14,
    color: "gray", // Sets the text color to gray
    marginBottom: 5, // Adds a bit of margin below the subtitle for spacing
  },
  keywordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});

export { styles };
