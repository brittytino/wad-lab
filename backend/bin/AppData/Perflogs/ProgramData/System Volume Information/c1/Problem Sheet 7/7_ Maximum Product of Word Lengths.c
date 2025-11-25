#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    int n;
    printf("Enter number of words: ");
    if (scanf("%d", &n) != 1) return 0;
    getchar(); 

    if (n <= 0) {
        printf("0\n");
        return 0;
    }

    char words[n][1005]; 
    int len[n];
    unsigned int mask[n];

    for (int i = 0; i < n; ++i) {
        printf("Enter word %d: ", i+1);
        if (!fgets(words[i], sizeof(words[i]), stdin)) { words[i][0] = '\0'; }
        size_t L = strlen(words[i]);
        if (L > 0 && words[i][L-1] == '\n') words[i][--L] = '\0';
        len[i] = (int)L;

        unsigned int m = 0;
        for (int j = 0; j < len[i]; ++j) {
            char c = words[i][j];
            if (c >= 'a' && c <= 'z') m |= 1u << (c - 'a');
            else if (c >= 'A' && c <= 'Z') m |= 1u << (c - 'A'); // optional
        }
        mask[i] = m;
    }

    int best = 0;
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if ((mask[i] & mask[j]) == 0) {
                int prod = len[i] * len[j];
                if (prod > best) best = prod;
            }
        }
    }

    printf("Maximum product = %d\n", best);
    return 0;
}
