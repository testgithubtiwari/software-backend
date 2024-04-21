const projects = [
  {
    _id: "662367f3e252169a062f0d3d",
    projectName: "Develop C++ program",
    eligibleBranches: ["AI", "CSE", "EE"],
    userId: {
      _id: "6623642cab01b641a532dbe4",
      name: "Dr Romi Benerjee",
      email: "rt936649@gmail.com",
    },
    offeredBy: "CSE",
    description: "Develop an C program in a unique way",
    createdAt: "2024-04-20T07:00:03.469Z",
    updatedAt: "2024-04-20T07:00:03.469Z",
    __v: 0,
  },
  {
    _id: "6623699ff607dd36e801b896",
    projectName: "efh ewf",
    eligibleBranches: ["cse"],
    userId: {
      _id: "6623642cab01b641a532dbe4",
      name: "Dr Romi Benerjee",
      email: "rt936649@gmail.com",
    },
    offeredBy: "CSE",
    description: "wdd",
    createdAt: "2024-04-20T07:07:11.395Z",
    updatedAt: "2024-04-20T07:07:11.395Z",
    __v: 0,
  },
  {
    _id: "66236f00f607dd36e801b8d2",
    projectName: "sWADA",
    eligibleBranches: ["SDF"],
    userId: {
      _id: "6623642cab01b641a532dbe4",
      name: "Dr Romi Benerjee",
      email: "rt936649@gmail.com",
    },
    offeredBy: "CSE",
    description: "DSAD",
    createdAt: "2024-04-20T07:30:08.934Z",
    updatedAt: "2024-04-20T07:30:08.934Z",
    __v: 0,
  },
  {
    _id: "6623725d22a6f6fa2fc6b648",
    projectName: "Write some binary search code",
    eligibleBranches: ["AI", "CSE", "EE"],
    userId: {
      _id: "6623721a22a6f6fa2fc6b644",
      name: "Dr.Saumitra",
      email: "ritiktiwari20037@gmail.com",
    },
    offeredBy: "CSE",
    description: "Develop an C program in a unique way",
    createdAt: "2024-04-20T07:44:29.788Z",
    updatedAt: "2024-04-20T07:44:29.788Z",
    __v: 0,
  },
];

// Iterate through each project object and print the email of the professor
projects.forEach((project) => {
  const professorEmail = project.userId.email;
  console.log(professorEmail);
});
