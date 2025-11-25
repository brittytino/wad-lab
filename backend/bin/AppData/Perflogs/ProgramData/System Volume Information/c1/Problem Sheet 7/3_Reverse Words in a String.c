#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char s[10005];
    printf("Enter the string: ");
    if (!fgets(s, sizeof(s), stdin)) return 0;
    size_t n = strlen(s);
    if (n > 0 && s[n-1] == '\n') s[--n] = '\0';

    // array to store start pointers and lengths of words (indexes)
    int starts[1000];
    int lengths[1000];
    int wcount = 0;

    int i = 0;
    while (s[i]) {
        // skip spaces
        while (s[i] && s[i] == ' ') i++;
        if (!s[i]) break;
        int st = i;
        while (s[i] && s[i] != ' ') i++;
        starts[wcount] = st;
        lengths[wcount] = i - st;
        wcount++;
        if (wcount >= 1000) break; // safety
    }

    // print in reverse
    if (wcount == 0) {
        printf("\n");
        return 0;
    }
    for (int k = wcount - 1; k >= 0; --k) {
        for (int j = 0; j < lengths[k]; ++j) putchar(s[starts[k] + j]);
        if (k > 0) putchar(' ');
    }
    putchar('\n');
    return 0;
}
