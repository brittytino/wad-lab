#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char s[200005];
    printf("Enter the string: ");
    if (!fgets(s, sizeof(s), stdin)) return 0;

    size_t n = strlen(s);
    if (n > 0 && s[n-1] == '\n') s[--n] = '\0';

    int left = 0, right = (int)n - 1;
    int ok = 1;
    while (left < right) {
        while (left < right && !isalnum((unsigned char)s[left])) left++;
        while (left < right && !isalnum((unsigned char)s[right])) right--;
        if (left < right) {
            char a = tolower((unsigned char)s[left]);
            char b = tolower((unsigned char)s[right]);
            if (a != b) { ok = 0; break; }
            left++; right--;
        }
    }
    printf("%s\n", ok ? "true" : "false");
    return 0;
}
