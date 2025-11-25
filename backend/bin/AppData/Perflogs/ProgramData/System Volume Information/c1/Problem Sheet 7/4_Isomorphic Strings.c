#include <stdio.h>
#include <string.h>

int main() {
    char s[50005], t[50005];
    printf("Enter string s: ");
    if (!fgets(s, sizeof(s), stdin)) return 0;
    printf("Enter string t: ");
    if (!fgets(t, sizeof(t), stdin)) return 0;

    size_t n1 = strlen(s);
    if (n1 > 0 && s[n1-1] == '\n') s[--n1] = '\0';
    size_t n2 = strlen(t);
    if (n2 > 0 && t[n2-1] == '\n') t[--n2] = '\0';

    if (n1 != n2) {
        printf("false\n");
        return 0;
    }

    int mapS[256], mapT[256];
    for (int i = 0; i < 256; ++i) { mapS[i] = -1; mapT[i] = -1; }

    for (int i = 0; i < (int)n1; ++i) {
        unsigned char cs = (unsigned char)s[i];
        unsigned char ct = (unsigned char)t[i];
        if (mapS[cs] == -1 && mapT[ct] == -1) {
            mapS[cs] = ct;
            mapT[ct] = cs;
        } else {
            if (mapS[cs] != ct || mapT[ct] != cs) {
                printf("false\n");
                return 0;
            }
        }
    }
    printf("true\n");
    return 0;
}
