#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char *word_to_digits(const char *w) {
    int n = strlen(w);
    char *d = malloc(n+1);
    for (int i=0;i<n;++i) d[i] = (char)('0' + (w[i]-'a'));
    d[n] = '\0';
    return d;
}

char *addStrings(const char *a, const char *b) {
    int na = strlen(a), nb = strlen(b);
    int i = na-1, j = nb-1;
    int cap = (na>nb?na:nb) + 2;
    char *res = malloc(cap);
    int k = 0, carry = 0;
    while (i>=0 || j>=0 || carry) {
        int da = (i>=0 ? a[i]-'0' : 0);
        int db = (j>=0 ? b[j]-'0' : 0);
        int s = da + db + carry;
        res[k++] = '0' + (s % 10);
        carry = s/10;
        --i; --j;
    }
    // reverse
    for (int l=0,r=k-1;l<r;++l,--r){ char t=res[l]; res[l]=res[r]; res[r]=t; }
    res[k] = '\0';
    return res;
}

void normalize(char *s) { // remove leading zeros but leave single zero
    int n = strlen(s);
    int i=0;
    while (i+1 < n && s[i]=='0') ++i;
    if (i>0) memmove(s, s+i, n-i+1);
}

int main(void) {
    static char w1[10005], w2[10005], wt[10005];
    if (scanf("%10004s %10004s %10004s", w1, w2, wt) != 3) return 0;
    char *d1 = word_to_digits(w1);
    char *d2 = word_to_digits(w2);
    char *dt = word_to_digits(wt);
    char *sum = addStrings(d1, d2);
    normalize(sum); normalize(dt);
    if (strcmp(sum, dt) == 0) printf("true\n");
    else printf("false\n");
    free(d1); free(d2); free(dt); free(sum);
    return 0;
}
