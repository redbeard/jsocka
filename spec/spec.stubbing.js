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
end
