#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct { unsigned char ch; int cnt; } Pair;

int cmpdesc(const void *a, const void *b) {
    const Pair *pa = a, *pb = b;
    return pb->cnt - pa->cnt;
}

int main(void) {
    static char s[100005];
    if (scanf("%100004s", s) != 1) return 0;
    int freq[256] = {0};
    for (char *p = s; *p; ++p) freq[(unsigned char)*p]++;
    Pair arr[256];
    int m = 0;
    for (int i=0;i<256;++i) if (freq[i]>0) { arr[m].ch = (unsigned char)i; arr[m].cnt = freq[i]; ++m; }
    qsort(arr, m, sizeof(Pair), cmpdesc);
    int n = strlen(s);
    char *out = malloc(n+1);
    char *op = out;
    for (int i=0;i<m;++i) {
        for (int k=0;k<arr[i].cnt;++k) *op++ = arr[i].ch;
    }
    *op = '\0';
    printf("%s\n", out);
    free(out);
    return 0;
}
