---
title: Lesson 1. Binary Gap
subTitle: Codility Lessons ~ Iterations
category: "Algorithm"
cover: head.png
---

# 문제
A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

For example, number 9 has binary representation 1001 and contains a binary gap of length 2. The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3. The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps. The number 32 has binary representation 100000 and has no binary gaps.

Write a function:

class Solution { public int solution(int N); }

that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5. Given N = 32 the function should return 0, because N has binary representation '100000' and thus no binary gaps.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..2,147,483,647].

# 해결방안
* 입력값을 2진수로 변환하고, 각 자릿수를 배열에 담는다.
* 2진수의 N 자릿수 중 0에 해당하는 수의 가짓수를 임시값에 할당한다.
* 임시값과 결과값을 비교하여 큰 값을 리턴한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int N) {
        // write your code in Java SE 8
        
        String binaryString = Integer.toBinaryString(N);
        char[] binaryChar = binaryString.toCharArray();
        
        int temp = 0;
        int answer = 0;
        
        for(int i = 0; i < binaryChar.length; i++) {
            if(binaryChar[i] == '0') {
                temp++;
            }else {
                if(temp > answer) answer = temp;
                temp = 0;
            }
        }
        return answer;
    }
}
```

