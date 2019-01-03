---
title: Lesson 4-4. Max Counters
subTitle: Codility Lessons ~ Counting Elements
category: "Algorithm"
cover: head.png
---

# 문제
A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1] and A[P], A[P + 1], ..., A[N − 1].

The difference between the two parts is the value of: |(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|

In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

For example, consider array A such that:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 4
    A[4] = 3
We can split this tape in four places:

* P = 1, difference = |3 − 10| = 7 
* P = 2, difference = |4 − 9| = 5 
* P = 3, difference = |6 − 7| = 1 
* P = 4, difference = |10 − 3| = 7 
Write a function:

class Solution { public int solution(int[] A); }

that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

For example, given:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 4
    A[4] = 3
the function should return 1, as explained above.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [2..100,000];
* each element of array A is an integer within the range [−1,000..1,000].

# 해결방안
* 배열 내부의 총합을 구한다.
* 좌측 포지션의 합을 올려가며 총합계의 차를 구한다.
* Math.abs()를 통해 최소 절대값을 리턴한다.

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