export const recipeQuery = [
  {
    $lookup: {
      from: "materials",
      localField: "materials._id",
      foreignField: "_id",
      as: "mat",
    },
  },
  {
    $addFields: {
      materials: {
        $map: {
          input: "$materials",
          as: "m",
          in: {
            $mergeObjects: [
              "$$m",
              {
                $first: {
                  $filter: {
                    input: "$mat",
                    cond: { $eq: ["$$this._id", "$$m._id"] },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $addFields: {
      materials: {
        $map: {
          input: "$materials",
          as: "m",
          in: {
            id: "$$m._id",
            name: "$$m.name",
            unit: "$$m.unit",
            amount: "$$m.mtNumber",
            cost: {
              $multiply: [
                { $divide: ["$$m.price", "$$m.amount"] },
                "$$m.mtNumber",
              ],
            },
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      materials: 1,
      description: 1,
      totalCost: { $sum: "$materials.cost" },
    },
  },
];

export const cakeQuery = [
  {
    $lookup: {
      from: "materials",
      localField: "materials._id",
      foreignField: "_id",
      as: "mat",
    },
  },
  {
    $addFields: {
      materials: {
        $map: {
          input: "$materials",
          as: "m",
          in: {
            $mergeObjects: [
              "$$m",
              {
                $first: {
                  $filter: {
                    input: "$mat",
                    cond: { $eq: ["$$this._id", "$$m._id"] },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $addFields: {
      materials: {
        $map: {
          input: "$materials",
          as: "m",
          in: {
            id: "$$m._id",
            name: "$$m.name",
            unit: "$$m.unit",
            mtNumber: "$$m.mtNumber",
            cost: {
              $multiply: [
                { $divide: ["$$m.price", "$$m.amount"] },
                "$$m.mtNumber",
              ],
            },
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "semiproducts",
      localField: "semiproducts._id",
      foreignField: "_id",
      as: "sp",
    },
  },
  {
    $addFields: {
      semiproducts: {
        $map: {
          input: "$semiproducts",
          as: "s",
          in: {
            $mergeObjects: [
              "$$s",
              {
                $first: {
                  $filter: {
                    input: "$sp",
                    cond: { $eq: ["$$this._id", "$$s._id"] },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "materials",
      localField: "semiproducts.materials._id",
      foreignField: "_id",
      as: "mtsp",
    },
  },
  {
    $addFields: {
      semiproducts: {
        $map: {
          input: "$semiproducts",
          as: "s",
          in: {
            spNumber: "$$s.spNumber",
            id: "$$s._id",
            name: "$$s.name",
            description: "$$s.description",
            materials: {
              $map: {
                input: "$$s.materials",
                as: "sm",
                in: {
                  $mergeObjects: [
                    "$$sm",
                    {
                      $first: {
                        $filter: {
                          input: "$mtsp",
                          cond: { $eq: ["$$this._id", "$$sm._id"] },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $addFields: {
      semiproducts: {
        $map: {
          input: "$semiproducts",
          as: "s",
          in: {
            spNumber: "$$s.spNumber",
            id: "$$s.id",
            name: "$$s.name",
            description: "$$s.description",
            materials: {
              $map: {
                input: "$$s.materials",
                as: "sm",
                in: {
                  id: "$$sm._id",
                  name: "$$sm.name",
                  unit: "$$sm.unit",
                  mtNumber: "$$sm.mtNumber",
                  cost: {
                    $multiply: [
                      { $divide: ["$$sm.price", "$$sm.amount"] },
                      "$$sm.mtNumber",
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $addFields: {
      semiproducts: {
        $map: {
          input: "$semiproducts",
          as: "s",
          in: {
            spNumber: "$$s.spNumber",
            id: "$$s.id",
            name: "$$s.name",
            description: "$$s.description",
            materials: "$$s.materials",
            materialcost: {
              $multiply: [{ $sum: "$$s.materials.cost" }, "$$s.spNumber"],
            },
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 1,
      deneme: 1,
      name: 1,
      size: 1,
      spNumber: 1,
      description: 1,
      materials: 1,
      semiproducts: 1,
      totalmaterialscost: { $sum: "$materials.cost" },
      totalsemiproductscost: { $sum: "$semiproducts.materialcost" },
      totalCost: {
        $sum: [
          { $sum: "$materials.cost" },
          { $sum: "$semiproducts.materialcost" },
        ],
      },
    },
  },
];