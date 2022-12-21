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

const buildFileSystem = () => {
  let fileSystem = { "/": {} };
  let path = "/";
  let localFolder = {};
  input.forEach((row) => {
    if (row.startsWith("$")) {
      const command = row.split(" ")[1];
      if (command === "ls") {
        // TODO
      } else if (command === "cd") {
        const folderName = row.split(" ")[2];
        // TODO
      }
    } else {
      const content = row.split(" ");
      const isFolder = isNan(Number(content[0]));
      if (isFolder) {
        const folderName = content[1];
        localFolder[folderName] = {};
      } else {
        const fileName = content[1];
        const size = Number(content[0]);
        localFolder[fileName] = size;
      }
    }
  });
  return fileSystem;
};

const getFolderSize = (path) => {
  let size = 0;
  // TODO
  return size;
};
