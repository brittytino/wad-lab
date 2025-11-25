#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int A,B,C;
    if (scanf("%d %d %d", &A, &B, &C) != 3) return 0;
    int cnt[3] = {A,B,C};
    char letters[3] = {'a','b','c'};
    int cap = A+B+C + 1;
    char *res = malloc(cap);
    char *rp = res;
    // last two placed
    char last1 = 0, last2 = 0;
    while (1) {
        // find best candidate
        int best = -1;
        for (int pick=0; pick<3; ++pick) {
            if (cnt[pick] <= 0) continue;
            char ch = letters[pick];
            if (last1 == last2 && last1 == ch) continue; // would make 3 in a row
            if (best == -1 || cnt[pick] > cnt[best]) best = pick;
        }
        if (best == -1) break;
        *rp++ = letters[best];
        cnt[best]--;
        last2 = last1; last1 = letters[best];
    }
    *rp = '\0';
    printf("%s\n", res);
    free(res);
    return 0;
}
