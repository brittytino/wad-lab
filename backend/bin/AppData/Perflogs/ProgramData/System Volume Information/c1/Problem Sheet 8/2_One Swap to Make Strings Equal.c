#include <stdio.h>
#include <string.h>

int main(void) {
    static char s1[100005], s2[100005];
    if (scanf("%100004s %100004s", s1, s2) != 2) return 0;
    int n1 = strlen(s1), n2 = strlen(s2);
    if (n1 != n2) { printf("false\n"); return 0; }
    int diff[3]; int d = 0;
    for (int i = 0; i < n1 && d <= 2; ++i) {
        if (s1[i] != s2[i]) {
            if (d < 3) diff[d] = i;
            ++d;
        }
    }
    if (d == 0) { printf("true\n"); return 0; }
    if (d == 2) {
        int i = diff[0], j = diff[1];
        if (s1[i] == s2[j] && s1[j] == s2[i]) printf("true\n");
        else printf("false\n");
        return 0;
    }
    printf("false\n");
    return 0;
}
