---
title: Lesson 5-1. Passing Cars
subTitle: Codility Lessons ~ Prefix sums
category: "Algorithm"
cover: head.png
---

# 문제
A non-empty array A consisting of N integers is given. The consecutive elements of array A represent consecutive cars on a road.

Array A contains only 0s and/or 1s:

* 0 represents a car traveling east,
* 1 represents a car traveling west.
The goal is to count passing cars. We say that a pair of cars (P, Q), where 0 ≤ P < Q < N, is passing when P is traveling to the east and Q is traveling to the west.

For example, consider array A such that:

    A[0] = 0
    A[1] = 1
    A[2] = 0
    A[3] = 1
    A[4] = 1
We have five pairs of passing cars: (0, 1), (0, 3), (0, 4), (2, 3), (2, 4).

Write a function:

class Solution { public int solution(int[] A); }

that, given a non-empty array A of N integers, returns the number of pairs of passing cars.

The function should return −1 if the number of pairs of passing cars exceeds 1,000,000,000.

For example, given:

    A[0] = 0
    A[1] = 1
    A[2] = 0
    A[3] = 1
    A[4] = 1
the function should return 5, as explained above.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [1..100,000];
* each element of array A is an integer that can have one of the following values: 0, 1.

# 해결방안
* 차량의 짝은 중복을 허용하지 않으므로 동쪽 혹은 서쪽의 차량을 기준으로 하여 짝을 짓는 경우의 수의 합을 리턴한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {
        // write your code in Java SE 8
        
        int pair = 0;
        int result = 0;
        
        for(int value : A) {
            if(value == 0) pair++;
            else result += pair;
        }
        if(result > 1000000000 || result < -1) return -1;
        else return result;
    }
}
```