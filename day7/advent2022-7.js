const fs = require("fs");
const input = fs.readFileSync("input6.txt", "utf8").split("\n");

/* 
Input:
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k

Output:
{
  '/': {
    a: {
      e: {
        'i': 584,
      },
      'f': 29116,
      'g': 2557,
      'h': 62595,
    },
    'b.txt': 14848514,
    'c.dat': 8504156,
    d: {
      'j': 4060174,
      'd.log': 8033020,
      'd.ext': 5626152,
      'k': 7214296
    }
  }
}
*/

const navigate = (folder, navigation) => {
  if (folder === ".." && navigation !== "/") {
    // Nav back
    navigation = navigation.split("/").slice(0, -1).join("/");
    if (navigation.length === 0) {
      navigation = "/"; // Check minimum path is root
    }
  } else {
    // Add folder to navigation
    navigation = `${navigation}/${folder}`;
  }
  return navigation;
};

const insertCurrentIntoFolder = (folder, fileName, fileSize) => {
  const isFolder = isNan(fileSize);
  if (isFolder) {
    folder[fileName] = {}; // Add sub-folder to current folder
  } else {
    folder[fileName] = fileSize; // Add file and his size to current folder
  }
  return folder;
};

/**
 * From rootFolder and navigation, returns the content of the folder
 * @param {object} fileSystem
 * @param {string} navigation
 * @returns {object}
 */
const getFolderContent = (fileSystem, navigation) => {
  let folder = {};
  let navigatedFS = fileSystem;
  const path = navigation.split("/");
  path.forEach((navFolder) => {
    folder = navigatedFS[navFolder];
    navigatedFS = navigatedFS[navFolder];
  });
  return folder;
};

const checkFolderContent = (navigation, folder) => {
  return {};
};

const buildFileSystem = () => {
  let fileSystem = { "/": {} };
  let navigation = "/";
  let folder = {};
  input.forEach((row) => {
    if (row.startsWith("$")) {
      const command = row.split(" ")[1];
      if (command === "ls") {
        fileSystem = checkFolderContent(navigation, folder);
      } else if (command === "cd") {
        const navPath = row.split(" ")[2];
        navigation = navigate(navPath, navigation);
      }
    } else {
      const content = row.split(" ");
      folder = insertCurrentIntoFolder(folder, content[1], Number(content[0]));
    }
  });
  return fileSystem;
};

const getFolderSize = (path) => {
  let size = 0;
  // TODO
  return size;
};
