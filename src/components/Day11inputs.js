const defaultInput = [
  {
    name: "test case",
    defaultInput: "Monkey 0:\n  Starting items: 79, 98\n  Operation: new = old * 19\n  Test: divisible by 23\n    If true: throw to monkey 2\n    If false: throw to monkey 3\n\nMonkey 1:\n  Starting items: 54, 65, 75, 74\n  Operation: new = old + 6\n  Test: divisible by 19\n    If true: throw to monkey 2\n    If false: throw to monkey 0\n\nMonkey 2:\n  Starting items: 79, 60, 97\n  Operation: new = old * old\n  Test: divisible by 13\n    If true: throw to monkey 1\n    If false: throw to monkey 3\n\nMonkey 3:\n  Starting items: 74\n  Operation: new = old + 3\n  Test: divisible by 17\n    If true: throw to monkey 0\n    If false: throw to monkey 1"
  },
  {
    name: "puzzle input",
    defaultInput: "Monkey 0:\n  Starting items: 71, 86\n  Operation: new = old * 13\n  Test: divisible by 19\n    If true: throw to monkey 6\n    If false: throw to monkey 7\n\nMonkey 1:\n  Starting items: 66, 50, 90, 53, 88, 85\n  Operation: new = old + 3\n  Test: divisible by 2\n    If true: throw to monkey 5\n    If false: throw to monkey 4\n\nMonkey 2:\n  Starting items: 97, 54, 89, 62, 84, 80, 63\n  Operation: new = old + 6\n  Test: divisible by 13\n    If true: throw to monkey 4\n    If false: throw to monkey 1\n\nMonkey 3:\n  Starting items: 82, 97, 56, 92\n  Operation: new = old + 2\n  Test: divisible by 5\n    If true: throw to monkey 6\n    If false: throw to monkey 0\n\nMonkey 4:\n  Starting items: 50, 99, 67, 61, 86\n  Operation: new = old * old\n  Test: divisible by 7\n    If true: throw to monkey 5\n    If false: throw to monkey 3\n\nMonkey 5:\n  Starting items: 61, 66, 72, 55, 64, 53, 72, 63\n  Operation: new = old + 4\n  Test: divisible by 11\n    If true: throw to monkey 3\n    If false: throw to monkey 0\n\nMonkey 6:\n  Starting items: 59, 79, 63\n  Operation: new = old * 7\n  Test: divisible by 17\n    If true: throw to monkey 2\n    If false: throw to monkey 7\n\nMonkey 7:\n  Starting items: 55\n  Operation: new = old + 7\n  Test: divisible by 3\n    If true: throw to monkey 2\n    If false: throw to monkey 1"
  }
];

export default defaultInput;
