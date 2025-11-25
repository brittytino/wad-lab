#include <stdio.h>
#include <string.h>

struct WebPage {
    char URL[100];
    int num_downloads;
    char type_of_webpage[50];
};

void Hit(struct WebPage *page, int hits) {
    page->num_downloads += hits;
}

void Display(struct WebPage page) {
    printf("%-30s %-15d %-20s\n", page.URL, page.num_downloads, page.type_of_webpage);
}

int main() {
    int n;

    printf("Enter number of webpages: ");
    scanf("%d", &n);
    getchar(); 

    struct WebPage pages[n];

    for (int i = 0; i < n; i++) {
        printf("\nEnter details for webpage %d:\n", i + 1);

        printf("Enter URL: ");
        fgets(pages[i].URL, sizeof(pages[i].URL), stdin);
        pages[i].URL[strcspn(pages[i].URL, "\n")] = '\0'; 

        printf("Enter Type of Webpage: ");
        fgets(pages[i].type_of_webpage, sizeof(pages[i].type_of_webpage), stdin);
        pages[i].type_of_webpage[strcspn(pages[i].type_of_webpage, "\n")] = '\0';

        pages[i].num_downloads = 0;

        int hits;
        printf("Enter number of hits/downloads: ");
        scanf("%d", &hits);
        getchar(); 
        Hit(&pages[i], hits);
    }

    printf("\n%-30s %-15s %-20s\n", "URL", "Num_downloads", "Type_of_webpage");
    printf("-----------------------------------------------------------------------\n");

    for (int i = 0; i < n; i++) {
        Display(pages[i]);
    }

    return 0;
}
