---
title: Lesson 4-1. Frog River One
subTitle: Codility Lessons ~ Counting Elements
category: "Algorithm"
cover: head.png
---

# 문제
A small frog wants to get to the other side of a river. The frog is initially located on one bank of the river (position 0) and wants to get to the opposite bank (position X+1). Leaves fall from a tree onto the surface of the river.

You are given an array A consisting of N integers representing the falling leaves. A[K] represents the position where one leaf falls at time K, measured in seconds.

The goal is to find the earliest time when the frog can jump to the other side of the river. The frog can cross only when leaves appear at every position across the river from 1 to X (that is, we want to find the earliest moment when all the positions from 1 to X are covered by leaves). You may assume that the speed of the current in the river is negligibly small, i.e. the leaves do not change their positions once they fall in the river.

For example, you are given integer X = 5 and array A such that:

    A[0] = 1
    A[1] = 3
    A[2] = 1
    A[3] = 4
    A[4] = 2
    A[5] = 3
    A[6] = 5
    A[7] = 4
In second 6, a leaf falls into position 5. This is the earliest time when leaves appear in every position across the river.

Write a function:

class Solution { public int solution(int X, int[] A); }

that, given a non-empty array A consisting of N integers and integer X, returns the earliest time when the frog can jump to the other side of the river.

If the frog is never able to jump to the other side of the river, the function should return −1.

For example, given X = 5 and array A such that:

    A[0] = 1
    A[1] = 3
    A[2] = 1
    A[3] = 4
    A[4] = 2
    A[5] = 3
    A[6] = 5
    A[7] = 4
the function should return 6, as explained above.

Write an efficient algorithm for the following assumptions:

* N and X are integers within the range [1..100,000];
* each element of array A is an integer within the range [1..X].

# 해결방안
* 이동거리 + 1 만큼의 크기를 갖는 논리 배열을 생성한다.
* 반복문을 통해 입력 배열 원소값을 인덱스로 갖는 논리 배열에 true 값을 할당하고 i 값을 리턴한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int X, int[] A) {
        // write your code in Java SE 8
        
        int step = X;
        boolean[] bitmap = new boolean[step + 1];
        
        for(int i = 0; i < A.length; i++) {
            if(!bitmap[A[i]]) {
                bitmap[A[i]] = true;
                step--;
            }
            if(step == 0) return i;
        }
        
        return -1;
    }
}
```