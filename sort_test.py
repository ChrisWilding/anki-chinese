import unittest

import sort


class TestSort(unittest.TestCase):

    def test_sort(self):
        frequencies = {
            '中国': 59.44,
            '下午': 87.28,
            '上': 3409.33,
            '下': 1549.34,
            '上午': 17.74,
            '中午': 18.99
        }

        words = [
            '中国',
            '下午',
            '上',
            '下',
            '上午',
            '中午'
        ]

        expected = [
            '上',
            '下',
            '下午',
            '中国',
            '中午',
            '上午'
        ]

        self.assertEqual(sort.sort(frequencies, words), expected)


if __name__ == '__main__':
    unittest.main()
