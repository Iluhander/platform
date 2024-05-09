import { IFooterColumn } from "../lib/types";

/**
 * Describing footer.
 * @description The function allows to flexibly configure footer contents.
 * It may help, for example, when depeveloping pages with users of different groups.<br><br>
 * The function returns <b>leadRow</b> and <b>commonColumns</b>.<br><br>
 * <b>leadRow</b> is an object, describing the first (lead) column in the footer.
 * It consists of link and label properties.<br><br>
 * </b>commonColumns</b> is an array of columns. Each column is an object with following properties:
 * <ol>
 *  <li> <i>header</i> - string with header of the column</li>
 *  <li> <i>addedClass</i> - string of classes, which will be added to class list of a column</li>
 *  <li> <i>rows</i> - an array, which contains rows descriptions.</li>
 * </ol>
 * <br>
 * Each row is an object with following properties:
 * <ol>
 *  <li> <i>link</i> - string with link of the row</li>
 *  <li> <i>elements</i> - array with elements of the row. Row may consist of different thing, for example,
 *  images or text. All elements are described in the elements array. They are displayed one
 *  by one in a row.</li>
 * </ol>
 * <br>
 * Each element of a row is an object with ether text or img (link for an image) property. Also it has
 * addedClass property, which works similarly to commonColumns property.
 * @returns Object, which has leadRow and commonColumns properties.
 */
function getFooterContents() {
  const leadRow = {
    link: '/post/6517e0a5bc120ff351b1103d',
    label: 'UwU Джем'
  };

  const commonColumns: IFooterColumn[] = [
    {
      header: '',
      rows: [
        {
          link: '/',
          elements: [
            {
              text: 'Играть !! →'
            }
          ]
        },
        {
          link: '/mynovels',
          elements: [
            { text: '←  Сделать новеллу !!' }
          ]
        },
        {
          link: '/post/663a3a064f695a98403b6e1b',
          elements: [
            { text: 'Гайд по движку' }
          ]
        }
      ]
    },
    {
      header: 'Мы здесь',
      rows: [
        {
          link: 'https://discord.gg/Dq8tUCNann',
          elements: [
            { img: `/icons/discord.png` },
            { text: '•' },
            { text: 'Дискорд сервер' }
          ]
        },
        {
          link: 'https://vk.com/public216514428',
          elements: [
            { img: `/icons/vk.png` },
            { text: '•' },
            { text: 'Группа ВКонтакте' }
          ]
        }
      ]
    },
    {
      header: 'Разработчикам',
      rows: [
        {
          link: '',
          elements: [
            { text: '•' },
            { text: 'Движок в Steam' }
          ]
        },
        {
          link: 'https://habr.com/ru/post/665150/',
          elements: [
            { text: '•' },
            { text: 'Наша история на Хабре' }
          ]
        }
      ]
    }
  ]

  return { leadRow, commonColumns };
}

export default getFooterContents;