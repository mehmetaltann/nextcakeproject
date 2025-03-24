export const recipeQuery = [
  {
    $lookup: {
      from: "materials",
      localField: "materials.materialId",
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
                    cond: { $eq: ["$$this._id", "$$m.materialId"] },
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
            id: "$$m.materialId",
            name: "$$m.name",
            unit: "$$m.unit",
            amount: "$$m.quantity",
            cost: {
              $multiply: [
                { $divide: ["$$m.price", "$$m.amount"] },
                "$$m.quantity",
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
      localField: "materials.materialId",
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
                    cond: { $eq: ["$$this._id", "$$m.materialId"] },
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
            id: "$$m.materialId",
            name: "$$m.name",
            unit: "$$m.unit",
            quantity: "$$m.quantity",
            cost: {
              $multiply: [
                { $divide: ["$$m.price", "$$m.amount"] },
                "$$m.quantity",
              ],
            },
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "recipes",
      localField: "recipes.recipeId",
      foreignField: "_id",
      as: "rcp",
    },
  },
  {
    $addFields: {
      recipes: {
        $map: {
          input: "$recipes",
          as: "r",
          in: {
            $mergeObjects: [
              "$$r",
              {
                $first: {
                  $filter: {
                    input: "$rcp",
                    cond: { $eq: ["$$this._id", "$$r.recipeId"] },
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
      localField: "recipes.materials.materialId",
      foreignField: "_id",
      as: "mtRcp",
    },
  },
  {
    $addFields: {
      recipes: {
        $map: {
          input: "$recipes",
          as: "r",
          in: {
            quantity: "$$r.quantity",
            id: "$$r._id",
            name: "$$r.name",
            description: "$$r.description",
            materials: {
              $map: {
                input: "$$r.materials",
                as: "rm",
                in: {
                  $mergeObjects: [
                    "$$rm",
                    {
                      $first: {
                        $filter: {
                          input: "$mtRcp",
                          cond: { $eq: ["$$this._id", "$$rm.materialId"] },
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
      recipes: {
        $map: {
          input: "$recipes",
          as: "r",
          in: {
            quantity:  "$$r.quantity",
            id: "$$r.id",
            name: "$$r.name",
            description: "$$r.description",
            materials: {
              $map: {
                input: "$$r.materials",
                as: "rm",
                in: {
                  id: "$$rm.materialId",
                  name: "$$rm.name",
                  unit: "$$rm.unit",
                  quantity: "$$rm.quantity",
                  cost: {
                    $multiply: [
                      { $divide: ["$$rm.price", "$$rm.amount"] },
                      "$$rm.quantity",
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
      recipes: {
        $map: {
          input: "$recipes",
          as: "r",
          in: {
            quantity:  "$$r.quantity",
            _id: "$$r.id",
            name: "$$r.name",
            description: "$$r.description",
            materials: "$$r.materials",
            materialcost: {
              $multiply: [{ $sum: "$$r.materials.cost" }, "$$r.quantity"],
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
      size: 1,
      description: 1,
      materials: 1,
      recipes: 1,
      totalmaterialscost: { $sum: "$materials.cost" },
      totalrecipescost: { $sum: "$recipes.materialcost" },
      totalCost: {
        $sum: [{ $sum: "$materials.cost" }, { $sum: "$recipes.materialcost" }],
      },
    },
  },
];
