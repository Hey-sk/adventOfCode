inputPath = "2023/day4/input.txt"
testPath = "2023/day4/testInput1.txt"

def parseInput(path):
    result = []
    file = open(path, "r")
    for line in file.readlines():
        input = line.split(': ')[1]
        card = line.split(': ')[0].replace('Card ', '')
        def isNumeric(char):
            return(str(char).isnumeric())
        winningNumbers = sorted(input.split(' | ')[0].split(' '))
        winningNumbers = list(filter(isNumeric, winningNumbers))
        scratchTicket = sorted(input.split(' | ')[1].replace('\n','').split(' '))
        scratchTicket = list(filter(isNumeric, scratchTicket))
        result.append({'card': card, 'winningNumbers': winningNumbers, 'scratchTicket': scratchTicket, 'Reviewed': False, 'matches': 0})
        
    return(result)

def getCommon():
    for input in parsedInput:
        winList = (input.get('winningNumbers'))
        scratchList = (input.get('scratchTicket'))
        intersection = (list((set(winList) & set(scratchList))))
        input['matches'] = len(intersection)
    return(parsedInput)

def seedCards():
    cards = []
    for index, input in enumerate(parsedInput):
        cards.append(input['card'])
    return(cards)

parsedInput = parseInput(inputPath)

getCommon()
cards = seedCards()

def getCopies(arr):
    arrCopy = arr.copy()
    def appendWinner(num):
        item = parsedInput[num - 1]
        card = int(item['card'])
        matches = int(item['matches'])
        rangeStart = card + 1
        rangeEnd = rangeStart + matches
        for i in range(rangeStart, rangeEnd):
            arrCopy.append(i)
            if parsedInput[i-1].get('matches') > 0:
                appendWinner(i)

    for num in sorted(arr):
        appendWinner(num)
    print(len(arrCopy))
    
def getCardValue(arr):
    result = []
    for item in arr:
        card = item.get('card')
        result.append(int(card))
    return result

cardArr = getCardValue(parsedInput)
print(cardArr)
getCopies(cardArr)