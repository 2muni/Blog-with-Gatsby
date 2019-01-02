---
title: Lesson 3-1. Frog Jmp
subTitle: Codility Lessons ~ Time Complexity
category: "Algorithm"
cover: head.png
---

# 문제
A small frog wants to get to the other side of the road. The frog is currently located at position X and wants to get to a position greater than or equal to Y. The small frog always jumps a fixed distance, D.

Count the minimal number of jumps that the small frog must perform to reach its target.

Write a function:

class Solution { public int solution(int X, int Y, int D); }

that, given three integers X, Y and D, returns the minimal number of jumps from position X to a position equal to or greater than Y.

For example, given:

    X = 10
    Y = 85
    D = 30
the function should return 3, because the frog will be positioned as follows:

* after the first jump, at position 10 + 30 = 40
* after the second jump, at position 10 + 30 + 30 = 70
* after the third jump, at position 10 + 30 + 30 + 30 = 100
Write an efficient algorithm for the following assumptions:

* X, Y and D are integers within the range [1..1,000,000,000];
* X ≤ Y.

# 해결방안
* 총 거리를 도약 거리를 나눈 몫과 나머지를 이용하여 횟수를 리턴한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int X, int Y, int D) {
        // write your code in Java SE 8
        
        int answer = (Y - X) / D;
        int mod = (Y - X) % D;
        
        if(mod == 0) 
            return answer;
        else 
            return answer + 1;
    }
}
```