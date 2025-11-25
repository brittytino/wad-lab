#include <stdio.h>
#include <string.h>

int main() {
    char s[50005], t[50005];
    printf("Enter string s (lowercase letters): ");
    if (!fgets(s, sizeof(s), stdin)) return 0;
    printf("Enter string t (lowercase letters): ");
    if (!fgets(t, sizeof(t), stdin)) return 0;

    size_t n1 = strlen(s);
    if (n1 > 0 && s[n1-1] == '\n') s[--n1] = '\0';
    size_t n2 = strlen(t);
    if (n2 > 0 && t[n2-1] == '\n') t[--n2] = '\0';

    if (n1 != n2) {
        printf("false\n");
        return 0;
    }

    int freq[26] = {0};
    for (size_t i = 0; i < n1; ++i) {
        freq[s[i] - 'a']++;
    }
    for (size_t i = 0; i < n2; ++i) {
        freq[t[i] - 'a']--;
    }
    for (int i = 0; i < 26; ++i) {
        if (freq[i] != 0) {
            printf("false\n");
            return 0;
        }
    }
    printf("true\n");
    return 0;
}
