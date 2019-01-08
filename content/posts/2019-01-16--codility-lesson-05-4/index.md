---
title: Lesson 5-4. Count Div
subTitle: Codility Lessons ~ Prefix sums
category: "Algorithm"
cover: head.png
---

# 문제
Write a function:

class Solution { public int solution(int A, int B, int K); }

that, given three integers A, B and K, returns the number of integers within the range [A..B] that are divisible by K, i.e.:

{ i : A ≤ i ≤ B, i mod K = 0 }

For example, for A = 6, B = 11 and K = 2, your function should return 3, because there are three numbers divisible by 2 within the range [6..11], namely 6, 8 and 10.

Write an efficient algorithm for the following assumptions:

A and B are integers within the range [0..2,000,000,000];
K is an integer within the range [1..2,000,000,000];
A ≤ B.

# 해결방안
* 주어진 순열에서 K 배수의 갯수를 구한다.
* 순열의 시작값이 0일 경우를 고려한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int A, int B, int K) {
        // write your code in Java SE 8
        
        int result = B / K;
        
        if(A == 0) result++;
        else result -= (A - 1) / K;
        
        return result;
    }
}
```