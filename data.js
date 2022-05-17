let data = {
  physics1: {
    fullName: "AP Physics 1: Algebra Based",
    maxTotalComposite: 100,
    sections: {
      mcq: {
        questions: 50,
        weight: 0.5
      },
      frq: {
        questions: {
          expDesign: {
            full: "Experimental Design FRQ",
            points: 12
          },
          qqAnalysis: {
            full: "Qualitative/Quantitative Analysis FRQ",
            points: 12
          },
          paraArgument: {
            full: "Paragraph Argument FRQ",
            points: 7
          },
          sa1: {
            full: "Short Answer 1 FRQ",
            points: 7
          },
          sa2: {
            full: "Short Answer 2 FRQ",
            points: 7
          }
        },
        weight: 0.5
      }
    },
    scores: {
      five: 70,
      four: 54,
      three: 40,
      two: 25
    }
  },

  chem: {
    fullName: "AP Chemistry",
    maxTotalComposite: 100,
    sections: {
      mcq: {
        questions: 60,
        maxScore: 50
      },
      frq: {
        questions: {
          long1: {
            full: "Long Response 1 (FRQ #1)",
            points: 10
          }, 
          long2: {
            full: "Long Response 2 (FRQ #2)",
            points: 10
          }, 
          long3: {
            full: "Long Response 3 (FRQ #3)",
            points: 10
          }, 
          short1: {
            full: "Short Response 1 (FRQ #4)",
            points: 4
          },
          short2: {
            full: "Short Response 2 (FRQ #5)",
            points: 4
          },
          short3: {
            full: "Short Response 3 (FRQ #6)",
            points: 4
          },
          short4: {
            full: "Short Response 4 (FRQ #7)",
            points: 4
          }
        },
        weight: 0.5
      }
    },
    scores: {
      five: 72,
      four: 58,
      three: 42,
      two: 9,
    }
  },

  gov: {
    fullName: "AP US Government and Politics",
    maxTotalComposite: 120,
    sections: {
      mcq: {
        questions: 55,
        weight: 0.5
      },
      frq: {
        questions: {
          concApp: {
            full: "Concept Application FRQ",
            points: 3
          },
          quanAn: {
            full: "Quantitative Analysis FRQ",
            points: 4
          },
          scotusComp: {
            full: "SCOTUS Comparison FRQ",
            points: 4
          },
          argEssay: {
            full: "Argumentative Essay",
            points: 6
          }
        }, 
        weight: 0.5
      }
    },
    scores: {
      five: 96,
      four: 82,
      three: 67,
      two: 42,
    }
  }
}
