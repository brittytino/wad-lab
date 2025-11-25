#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char pattern[305];
    char s[3005];

    printf("Enter pattern: ");
    if (!fgets(pattern, sizeof(pattern), stdin)) return 0;
    printf("Enter string s (words separated by single spaces): ");
    if (!fgets(s, sizeof(s), stdin)) return 0;

    size_t np = strlen(pattern);
    if (np > 0 && pattern[np-1] == '\n') pattern[--np] = '\0';
    size_t ns = strlen(s);
    if (ns > 0 && s[ns-1] == '\n') s[--ns] = '\0';

    // split s into words (naive)
    char *words[1000];
    int wcount = 0;
    char *p = s;
    while (*p) {
        while (*p == ' ') p++;
        if (!*p) break;
        words[wcount++] = p;
        while (*p && *p != ' ') p++;
        if (*p == ' ') { *p = '\0'; p++; }
    }

    int plen = (int)strlen(pattern);
    if (plen != wcount) {
        printf("false\n");
        return 0;
    }

    char *map[26] = {0}; // mapping from char to word pointer

    for (int i = 0; i < plen; ++i) {
        int idx = pattern[i] - 'a';
        if (map[idx] == NULL) {
            // ensure no other pattern char already maps to words[i]
            for (int c = 0; c < 26; ++c) {
                if (map[c] != NULL && strcmp(map[c], words[i]) == 0) {
                    printf("false\n");
                    return 0;
                }
            }
            map[idx] = words[i];
        } else {
            if (strcmp(map[idx], words[i]) != 0) {
                printf("false\n");
                return 0;
            }
        }
    }

    printf("true\n");
    return 0;
}
