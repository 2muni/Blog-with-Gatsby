---
title: Lesson 4-4. Max Counters
subTitle: Codility Lessons ~ Counting Elements
category: "Algorithm"
cover: head.png
---

# 문제
You are given N counters, initially set to 0, and you have two possible operations on them:

increase(X) − counter X is increased by 1,
max counter − all counters are set to the maximum value of any counter.
A non-empty array A of M integers is given. This array represents consecutive operations:

if A[K] = X, such that 1 ≤ X ≤ N, then operation K is increase(X),
if A[K] = N + 1 then operation K is max counter.
For example, given integer N = 5 and array A such that:

    A[0] = 3
    A[1] = 4
    A[2] = 4
    A[3] = 6
    A[4] = 1
    A[5] = 4
    A[6] = 4
the values of the counters after each consecutive operation will be:

    (0, 0, 1, 0, 0)
    (0, 0, 1, 1, 0)
    (0, 0, 1, 2, 0)
    (2, 2, 2, 2, 2)
    (3, 2, 2, 2, 2)
    (3, 2, 2, 3, 2)
    (3, 2, 2, 4, 2)
The goal is to calculate the value of every counter after all operations.

Write a function:

class Solution { public int[] solution(int N, int[] A); }

that, given an integer N and a non-empty array A consisting of M integers, returns a sequence of integers representing the values of the counters.

Result array should be returned as an array of integers.

For example, given:

    A[0] = 3
    A[1] = 4
    A[2] = 4
    A[3] = 6
    A[4] = 1
    A[5] = 4
    A[6] = 4
the function should return [3, 2, 2, 4, 2], as explained above.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [2..100,000];
* each element of array A is an integer within the range [−1,000..1,000].

# 해결방안
* 최대카운터 연산을 위한 반복문을 별도로 설계한다.
* 중간값의 경우, 사전에 행산 최대카운터 연산 여부에 따라 값을 할당한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int[] solution(int N, int[] A) {
        // write your code in Java SE 8
        
        int[] counter = new int[N];
        int maxCounter = 0;
        int temp = 0;
        
        for(int value : A) {
            if(value > N) {
                maxCounter = temp;
            }else {
                if(counter[value - 1] < maxCounter) counter[value - 1] = maxCounter;
                counter[value - 1]++;
                if(counter[value - 1] > temp) temp = counter[value - 1];
            }
        }
        for(int i = 0; i < N; i++) {
            if(counter[i] < maxCounter) counter[i] = maxCounter;
        }
        
        return counter;
    }
}
```