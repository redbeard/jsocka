describe "Apple"
  describe ".stubs(method)"
    describe ".returns(method)"
      before_each
        Apple.stubs("getType").returns("function(){return 'A Vegetable'}")
      end
      it "should modify a class function"
        Apple.getType().should_equal "A Vegetable"
      end
      it "should not affect an instance method of the same name"
        a = new Apple("Red Delicious")
        a.getType().should_equal "Red Delicious"
      end
    end
  end
  describe ".any_instance"
    describe ".stubs(method)"
      describe ".returns(method)"
        before_each
          Apple.any_instance.stubs("getType").returns("function(){return 'Granny Smith'}")
        end
        it "should modify an instance method"
          a = new Apple("Red Delicious")
          a.getType().should_equal "Granny Smith"
        end
        it "should not affect a class method of the same name"
          Apple.getType().should_equal "A Fruit"
        end
      end
    end
  end
  describe ".clearStubs()"
    it "should remove all class and instance method stubs"
      Apple.stubs("getType").returns("function(){return 'A Vegetable'}")
      Apple.any_instance.stubs("getType").returns("function(){return 'Granny Smith'}")
      a = new Apple("Red Delicious")
      JSocka.clearStubs()
      a.getType().should_equal "Red Delicious"
      Apple.getType().should_equal "A Fruit"
    end
  end
  describe ".expects(method)"
    describe ".with(parameter)"
      before_each
        Apple.expects("getType").with("Cake")
      end
      it "should not fail when passed the expected parameter"
        Apple.getType("Cake")
      end
      it "should throw an error when passed an incorrect parameter (test should fail)"
      end
    end
    describe ".returns(method)"
      before_each
        Apple.expects("getType").returns("function(){return 'A Vegetable'}") 
      end
      it "should modify a class function"
        Apple.getType().should_equal "A Vegetable"
      end
      it "should not affect an instance method of the same name"
        a = new Apple("Red Delicious")
        Apple.getType()
        a.getType().should_equal "Red Delicious"
      end
    end
    describe ".never()"
      it "should throw an error if the stubbed method is called (test should fail)"
        Apple.expects("getType").never()
        Apple.getType()
      end
    end
  end
end
