export const taskTree = [
  {
    id: 1,
    label: "一级 1",
    type: "0", // "dir"
    children: [
      {
        id: 4,
        label: "二级 1-1",
        type: "0", // "dir"
        children: [
          {
            id: 9,
            type: "1", // "file"
            label: "三级 1-1-1"
          },
          {
            id: 10,
            label: "三级 1-1-2",
            type: "1" // "file"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "一级 2",
    type: "0", // "dir"
    children: [
      {
        id: 5,
        label: "二级 2-1",
        type: "1" // "file"
      },
      {
        id: 6,
        label: "二级 2-2",
        type: "1" // "file"
      }
    ]
  },
  {
    id: 3,
    label: "一级 3",
    type: "0", // "dir"
    children: [
      {
        id: 7,
        label: "二级 3-1",
        type: "1" // "file"
      },
      {
        id: 8,
        label: "二级 3-2",
        type: "1" // "file"
      }
    ]
  }
];
