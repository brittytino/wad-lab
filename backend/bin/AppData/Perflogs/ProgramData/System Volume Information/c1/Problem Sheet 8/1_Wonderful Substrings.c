#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void) {
    char buf[100005];
    if (scanf("%100004s", buf) != 1) return 0;
    long long count[1<<10];
    for (int i=0;i<(1<<10);++i) count[i]=0;
    unsigned int mask = 0;
    count[0] = 1;
    long long ans = 0;
    char *p = buf;
    while (*p) {
        char c = *p++;
        if (c < 'a' || c > 'j') continue; // safety: problem states a..j
        mask ^= (1U << (c - 'a'));
        ans += count[mask];
        for (int k=0;k<10;++k) ans += count[mask ^ (1U<<k)];
        ++count[mask];
    }
    printf("%lld\n", ans);
    return 0;
}
