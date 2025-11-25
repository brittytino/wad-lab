#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINE 1024
#define TEMP_FILE "temp.txt"

void delete_line(const char *filename, int line_no);
void replace_line(const char *filename, int line_no, const char *new_text);
int count_lines(const char *filename);

int main(void) {
    char filename[100];
    int choice, line_no;
    char new_text[MAX_LINE];

    printf("Enter file name: ");
    scanf("%s", filename);

    while (1) {
        printf("\nMENU\n");
        printf("1. Delete a specific line\n");
        printf("2. Replace a specific line\n");
        printf("3. Find number of lines\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);
        getchar(); // clear newline

        switch (choice) {
        case 1:
            printf("Enter line number to delete: ");
            scanf("%d", &line_no);
            delete_line(filename, line_no);
            break;
        case 2:
            printf("Enter line number to replace: ");
            scanf("%d", &line_no);
            getchar(); // clear newline
            printf("Enter new text for that line:\n");
            fgets(new_text, MAX_LINE, stdin);
            new_text[strcspn(new_text, "\n")] = '\0';
            replace_line(filename, line_no, new_text);
            break;
        case 3:
            printf("Number of lines: %d\n", count_lines(filename));
            break;
        case 4:
            return 0;
        default:
            printf("Invalid choice\n");
        }
    }
}

void delete_line(const char *filename, int line_no) {
    FILE *fp = fopen(filename, "r");
    FILE *temp = fopen(TEMP_FILE, "w");
    char line[MAX_LINE];
    int current = 1;

    if (!fp || !temp) {
        printf("Error opening file.\n");
        return;
    }

    while (fgets(line, MAX_LINE, fp) != NULL) {
        if (current != line_no) {
            fputs(line, temp);
        }
        current++;
    }

    fclose(fp);
    fclose(temp);

    remove(filename);
    rename(TEMP_FILE, filename);

    printf("Line deleted (if it existed).\n");
}

void replace_line(const char *filename, int line_no, const char *new_text) {
    FILE *fp = fopen(filename, "r");
    FILE *temp = fopen(TEMP_FILE, "w");
    char line[MAX_LINE];
    int current = 1;

    if (!fp || !temp) {
        printf("Error opening file.\n");
        return;
    }

    while (fgets(line, MAX_LINE, fp) != NULL) {
        if (current == line_no) {
            fprintf(temp, "%s\n", new_text);
        } else {
            fputs(line, temp);
        }
        current++;
    }

    fclose(fp);
    fclose(temp);

    remove(filename);
    rename(TEMP_FILE, filename);

    printf("Line replaced (if it existed).\n");
}

int count_lines(const char *filename) {
    FILE *fp = fopen(filename, "r");
    char line[MAX_LINE];
    int count = 0;

    if (!fp) {
        printf("Error opening file.\n");
        return 0;
    }

    while (fgets(line, MAX_LINE, fp) != NULL) {
        count++;
    }

    fclose(fp);
    return count;
}
