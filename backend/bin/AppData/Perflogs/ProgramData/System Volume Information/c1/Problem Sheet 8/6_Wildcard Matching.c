#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    static char s[2005], p[2005];
    if (scanf("%2004s %2004s", s, p) < 1) return 0;
    int n = strlen(s), m = strlen(p);
    // allocate flattened dp (n+1)*(m+1)
    char *dp = malloc((n+1)*(m+1));
    memset(dp, 0, (n+1)*(m+1));
    #define DP(i,j) dp[(i)*(m+1) + (j)]
    DP(0,0) = 1;
    for (int j=1;j<=m;++j) {
        if (p[j-1] == '*') DP(0,j) = DP(0,j-1);
        else DP(0,j) = 0;
    }
    for (int i=1;i<=n;++i) DP(i,0) = 0;
    for (int i=1;i<=n;++i) {
        for (int j=1;j<=m;++j) {
            char pc = p[j-1];
            if (pc == '?' || pc == s[i-1]) DP(i,j) = DP(i-1,j-1);
            else if (pc == '*') DP(i,j) = (DP(i,j-1) || DP(i-1,j));
            else DP(i,j) = 0;
        }
    }
    printf("%s\n", DP(n,m) ? "true" : "false");
    free(dp);
    return 0;
}
