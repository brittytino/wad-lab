#include <stdio.h>
#include <string.h>

int main() {
    char s[10005];
    printf("Enter the string: ");
    if (!fgets(s, sizeof(s), stdin)) return 0;

    // remove newline
    size_t n = strlen(s);
    if (n > 0 && s[n-1] == '\n') s[--n] = '\0';

    // scan from end, skip trailing spaces
    int i = (int)n - 1;
    while (i >= 0 && s[i] == ' ') i--;

    // count chars of last word
    int len = 0;
    while (i >= 0 && s[i] != ' ') { len++; i--; }

    printf("Length of last word = %d\n", len);
    return 0;
}
