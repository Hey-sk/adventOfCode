testPath = '2023/day14/testInput1.txt'
inputPath = '2023/day14/input.txt'
chosenPath = inputPath


def parseInput(path):
    result = []
    file = open(path, 'r')
    for line in file:
        line = line.replace('\n','')
        result.append([x for x in line])
    return result

#transpose rows and columns
def transpose(arr):
    return [[arr[row][col] for row in range(len(arr))] for col in range(len(arr[0]))]

def tilt(arr, dir):
    if dir == 'north' or dir == 'south':
        arr = transpose(arr)
    newArr = []
    for row in arr:
        str = ''
        subArr = []
        for colNum, char in enumerate(row):
            if char != '#':
                str += char
            if char == '#':
                subArr.append(str)
                subArr.append('#')
                str = ''
            if colNum == len(row) - 1:
                if len(str) > 0:
                    subArr.append(str)
                subArr = [x for x in subArr if x != '']
                newArr.append(subArr)
    
    for rowNum, row in enumerate(newArr):
        if dir == 'north' or dir == 'west':
            sortedRow = [sorted(val, reverse=True) for val in row]
        if dir == 'south' or dir == 'east':
                sortedRow = [sorted(val) for val in row]
        sortedRow = [''.join(val) for val in sortedRow]
        newArr[rowNum] = [x for x in ''.join(sortedRow)]
    if dir == 'north' or dir == 'south':
        return transpose(newArr)
    else:
        return(newArr)
    
def visualize(arr):
    for row in arr:
        print(''.join(row))

def getScore(arr):
    rowNum = len(arr)
    score = 0
    for row in arr:
        letterOs = [char for char in row if char == 'O']
        score += rowNum * len(letterOs)
        rowNum -= 1
    print(score)

input = parseInput(chosenPath)
result = tilt(input, 'north')
visualize(result)
getScore(result)