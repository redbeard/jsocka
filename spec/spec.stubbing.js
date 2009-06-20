describe "JSocka(object)"
  before_each
    JSocka.destub()
  end
  describe ".stubs(method)"
    describe ".returns(method)"
      before_each
        JSocka("Apple").stubs("getType").returns("function(){return 'A Vegetable'}")
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
          JSocka("Apple").any_instance.stubs("getType").returns("function(){return 'Granny Smith'}")
        end
        it "should modify an instance method"
          a = new Apple("Red Delicious")
          a.getType().should_equal "Granny Smith"
        end
        it "should not affect a class method of the same name"
          a = new Apple("Red Delicious")
          Apple.getType().should_equal "A Fruit"
        end
      end
    end
  end
  describe ".destub()"
    it "should remove all class and instance method stubs"
      a = new Apple("Red Delicious")
      JSocka("Apple").stubs("getType").returns("function(){return 'A Vegetable'}")
      JSocka("Apple").any_instance.stubs("getType").returns("function(){return 'Granny Smith'}")
      JSocka.destub()
      a.getType().should_equal "Red Delicious"
      Apple.getType().should_equal "A Fruit"
    end
  end
  describe ".expects(method)"
    describe ".with(parameter)"
      it "should not fail when passed the expected parameter"
        JSocka("Apple").expects("getType").with("Cake")
        Apple.getType("Cake")
        JSocka.checkExpectations().should_equal true
      end
      it "should throw an error when passed an incorrect parameter"
        JSocka("Apple").expects("getType").with("Cake")
        Apple.getType("Carrots")
        -{JSocka.checkExpectations()}.should_throw_error
      end
    end
    describe ".returns(method)"
      it "should modify a class function"
        JSocka("Apple").expects("getType").returns("function(){return 'A Vegetable'}") 
        Apple.getType().should_equal "A Vegetable"
        JSocka.checkExpectations()
      end
      it "should not affect an instance method of the same name"

      end
    end
    describe ".never()"
      it "should throw an error if the stubbed method is called"
        JSocka("Apple").expects("getType").never()
        Apple.getType() 
        -{JSocka.checkExpectations()}.should_throw_error
      end
    end
  end
end
