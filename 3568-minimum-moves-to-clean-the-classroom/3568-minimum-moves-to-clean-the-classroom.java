import java.util.*;

class Solution {

    public int minMoves(String[] classroom, int energy) {

        int m = classroom.length;
        int n = classroom[0].length();

        int trashCount = 0;
        int startR = 0, startC = 0;

        // Number each piece of trash
        int[][] id = new int[m][n];
        for (int[] row : id) {
            Arrays.fill(row, -1);
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {

                char ch = classroom[i].charAt(j);

                if (ch == 'S') {
                    startR = i;
                    startC = j;
                }

                if (ch == 'L') {
                    id[i][j] = trashCount++;
                }
            }
        }

        // All trash collected
        int target = (1 << trashCount) - 1;

        /*
         * State:
         * row, col, energy, mask
         */
        Queue<int[]> queue = new LinkedList<>();

        queue.offer(new int[]{
            startR, startC, energy, 0
        });

        /*
         * visited[row][col][energy][mask]
         */
        boolean[][][][] visited =
            new boolean[m][n][energy + 1][1 << trashCount];

        visited[startR][startC][energy][0] = true;

        int[][] directions = {
            {1, 0},
            {-1, 0},
            {0, 1},
            {0, -1}
        };

        int moves = 0;

        while (!queue.isEmpty()) {

            int size = queue.size();

            while (size-- > 0) {

                int[] state = queue.poll();

                int r = state[0];
                int c = state[1];
                int e = state[2];
                int mask = state[3];

                // All trash collected
                if (mask == target) {
                    return moves;
                }

                for (int[] dir : directions) {

                    int nr = r + dir[0];
                    int nc = c + dir[1];

                    if (nr < 0 || nr >= m ||
                        nc < 0 || nc >= n) {
                        continue;
                    }

                    char cell = classroom[nr].charAt(nc);

                    // Wall
                    if (cell == 'X') {
                        continue;
                    }

                    // Need energy to move
                    if (e == 0) {
                        continue;
                    }

                    int newEnergy = e - 1;
                    int newMask = mask;

                    // Collect trash
                    if (cell == 'L') {
                        newMask |= (1 << id[nr][nc]);
                    }

                    // Recharge
                    if (cell == 'R') {
                        newEnergy = energy;
                    }

                    if (!visited[nr][nc][newEnergy][newMask]) {

                        visited[nr][nc][newEnergy][newMask] = true;

                        queue.offer(new int[]{
                            nr,
                            nc,
                            newEnergy,
                            newMask
                        });
                    }
                }
            }

            moves++;
        }

        return -1;
    }
}