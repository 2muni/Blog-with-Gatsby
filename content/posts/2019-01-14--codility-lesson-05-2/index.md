---
title: Lesson 5-2. Genomic Range Query
subTitle: Codility Lessons ~ Prefix sums
category: "Algorithm"
cover: head.png
---

# 문제
A DNA sequence can be represented as a string consisting of the letters A, C, G and T, which correspond to the types of successive nucleotides in the sequence. Each nucleotide has an impact factor, which is an integer. Nucleotides of types A, C, G and T have impact factors of 1, 2, 3 and 4, respectively. You are going to answer several queries of the form: What is the minimal impact factor of nucleotides contained in a particular part of the given DNA sequence?

The DNA sequence is given as a non-empty string S = S[0]S[1]...S[N-1] consisting of N characters. There are M queries, which are given in non-empty arrays P and Q, each consisting of M integers. The K-th query (0 ≤ K < M) requires you to find the minimal impact factor of nucleotides contained in the DNA sequence between positions P[K] and Q[K] (inclusive).

For example, consider string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6
The answers to these M = 3 queries are as follows:

* The part of the DNA between positions 2 and 4 contains nucleotides G and C (twice), whose impact factors are 3 and 2 respectively, so the answer is 2.
* The part between positions 5 and 5 contains a single nucleotide T, whose impact factor is 4, so the answer is 4.
* The part between positions 0 and 6 (the whole string) contains all nucleotides, in particular nucleotide A whose impact factor is 1, so the answer is 1.
Assume that the following declarations are given:

struct Results {
  int * A;
  int M; // Length of the array
};

Write a function:

struct Results solution(char *S, int P[], int Q[], int M);

that, given a non-empty string S consisting of N characters and two non-empty arrays P and Q consisting of M integers, returns an array consisting of M integers specifying the consecutive answers to all queries.

Result array should be returned as a structure Results.

For example, given the string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6
the function should return the values [2, 4, 1], as explained above.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [1..100,000];
* M is an integer within the range [1..50,000];
* each element of arrays P, Q is an integer within the range [0..N − 1];
* P[K] ≤ Q[K], where 0 ≤ K < M;
* string S consists only of upper-case English letters A, C, G, T.

# 해결방안
* String의 각 char('T' 제외)의 누적 카운트 배열을 선언한다.
* 주어진 범위에 따라 배열 원소 값의 변화를 탐색, 결과에 따라 값을 리턴한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int[] solution(String S, int[] P, int[] Q) {
        // write your code in Java SE 8
        
        int[] isA = new int[S.length() + 1];
        int[] isC = new int[S.length() + 1];
        int[] isG = new int[S.length() + 1];
        int[] result = new int[P.length];
        
        int countA = 0;
        int countC = 0;
        int countG = 0;
        
        isA[0] = 0;
        isC[0] = 0;
        isG[0] = 0;
        
        for(int i = 1; i < S.length() + 1; i++) {
            switch(S.charAt(i - 1)) {
                case 'A': countA++; break;
                case 'C': countC++; break;
                case 'G': countG++; break;
            }

            isA[i] = countA;
            isC[i] = countC;
            isG[i] = countG;
        }
        
        for(int i = 0; i < P.length; i++) {
            if(isA[P[i] + 1] - isA[P[i]] > 0 || isA[Q[i] + 1] - isA[P[i] + 1] > 0) result[i] = 1;
            else if(isC[P[i] + 1] - isC[P[i]] > 0 || isC[Q[i] + 1] - isC[P[i] + 1] > 0) result[i] = 2;
            else if(isG[P[i] + 1] - isG[P[i]] > 0 || isG[Q[i] + 1] - isG[P[i] + 1] > 0) result[i] = 3;
            else result[i] = 4;
        }
        
        return result;
    }
}
```