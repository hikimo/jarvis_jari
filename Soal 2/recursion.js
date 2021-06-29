let data = [
  {
    id: 'A001',
    name: 'Wati',
    parent: ''
  },
  {
    id: 'A002',
    name: 'Wira',
    parent: 'A001'
  },
  {
    id: 'A003',
    name: 'Andi',
    parent: 'A002'
  },
  {
    id: 'A004',
    name: 'Bagus',
    parent: 'A002'
  },

  {
    id: 'A005',
    name: 'Siti',
    parent: 'A001'
  },
  {
    id: 'A006',
    name: 'Hasan',
    parent: 'A005'
  },
  {
    id: 'A007',
    name: 'Abdul',
    parent: 'A006'
  }
]

function main() {

  find = 'A001'
  getChild(find)
}

function getChild(obj) {

  child = data.filter(item => item.parent == obj)
  if (child.length > 0) {
    child.forEach(element => {
      getChild(element.id)
      console.log(element.name)
    });
  }

}

main()