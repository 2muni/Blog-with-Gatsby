---
title: Lesson 6-4. Number Of Disc Intersections
subTitle: Codility Lessons ~ Sorting
category: "Algorithm"
cover: head.png
---

# 문제
We draw N discs on a plane. The discs are numbered from 0 to N − 1. An array A of N non-negative integers, specifying the radiuses of the discs, is given. The J-th disc is drawn with its center at (J, 0) and radius A[J].

We say that the J-th disc and K-th disc intersect if J ≠ K and the J-th and K-th discs have at least one common point (assuming that the discs contain their borders).

The figure below shows discs drawn for N = 6 and A as follows:

    A[0] = 1
    A[1] = 5
    A[2] = 2
    A[3] = 1
    A[4] = 4
    A[5] = 0

There are eleven (unordered) pairs of discs that intersect, namely:

* discs 1 and 4 intersect, and both intersect with all the other discs;
* disc 2 also intersects with discs 0 and 3.
Write a function:

class Solution { public int solution(int[] A); }

that, given an array A describing N discs as explained above, returns the number of (unordered) pairs of intersecting discs. The function should return −1 if the number of intersecting pairs exceeds 10,000,000.

Given array A shown above, the function should return 11, as explained above.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [0..100,000];
* each element of array A is an integer within the range [0..2,147,483,647].

# 해결방안
* 입력 배열의 인덱스에 따라 원의 시작 위치와 종료 위치의 수를 저장한다.(범위를 벗어날 수는 없다.)
* 현재 위치에서 시작하는 원의 수에 따라 원을 한쌍으로 그룹 짓는 경우의 수를 구한다.
* 해당 위치에서 시작하는 원이 많을 경우를 고려한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {
        // write your code in Java SE 8
        
        int result = 0; 
        int startAt[] = new int[A.length];
        int endAt[] = new int[A.length];
        
        for(int i = 0, j = A.length - 1; i < A.length; i++) {
            int startIdx = i > A[i] ? i - A[i] : 0;
            int endIdx = j - i > A[i] ? i + A[i] : j;

            startAt[startIdx]++;
            endAt[endIdx]++;
        }
        
        int currentDiscNumber = 0;

        for(int i = 0; i < A.length; i++) {
            if(startAt[i] > 0) {
                result += startAt[i] * (startAt[i] - 1) / 2;
                result += currentDiscNumber * startAt[i];

                if(10000000 < result) return -1;
                
                currentDiscNumber += startAt[i];
            }

            currentDiscNumber -= endAt[i];
        }
        
        return result;
    }
}
```